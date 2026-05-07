import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { AuthService } from '../../shared/services/auth.service';
import {
  UserProfileApiService,
  UserStat,
  UserStamp,
  UserActivity,
  UserCollectionItem,
} from '../../shared/services/user-profile.service';
import {
  CHANGARRO_PROFILE_AVATAR_DRAFT_KEY,
  CHANGARRO_PROFILE_NAME_DRAFT_KEY,
  CHANGARRO_PROFILE_PHONE_DRAFT_KEY,
  gradientFromName,
  initialsFromDisplayName,
} from '../../shared/utils/avatar-placeholder';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, TabBar, Sidebar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly userApi = inject(UserProfileApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  stats: UserStat[] = [];
  sellos: UserStamp[] = [];
  activity: UserActivity[] = [];
  collection: UserCollectionItem[] = [];

  userLevel = 1;
  userLevelName = 'Nuevo';
  userCoins = 0;
  userCreatedAt = '';
  userRole = '';

  tabs = ['Mi colección', 'Reseñas', 'Listas'];
  activeTab = 'Mi colección';

  loading = true;
  saving = false;
  loadError = '';
  saveError = '';
  saveSuccess = false;

  editing = false;
  editName = '';
  editPhone = '';
  profilePhotoUrl: string | null = null;
  private editPhotoSnapshot: string | null = null;

  private savedName = '';
  private savedPhone = '';

  showDeleteModal = false;
  deleteConfirmText = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.loadError = '';

    forkJoin({
      profile: this.userApi.getMyProfile(),
      stats: this.userApi.getMyStats().pipe(catchError(() => of(null))),
      stamps: this.userApi.getMyStamps().pipe(catchError(() => of([]))),
      activity: this.userApi.getMyActivity().pipe(catchError(() => of([]))),
      collection: this.userApi.getMyCollection().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ profile, stats, stamps, activity, collection }) => {
        this.editName = profile.name || '';
        this.editPhone = profile.whatsapp || profile.phone || '';
        this.profilePhotoUrl = profile.profilePhotoUrl || null;
        this.userLevel = profile.level ?? 1;
        this.userLevelName = profile.levelName || 'Nuevo';
        this.userCoins = profile.coins ?? 0;
        this.userCreatedAt = profile.createdAt || '';
        this.userRole = profile.role || this.auth.user()?.role || '';

        const draftAvatar = sessionStorage.getItem(CHANGARRO_PROFILE_AVATAR_DRAFT_KEY);
        if (draftAvatar) {
          this.profilePhotoUrl = draftAvatar;
          sessionStorage.removeItem(CHANGARRO_PROFILE_AVATAR_DRAFT_KEY);
        }

        const draftName = sessionStorage.getItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY)?.trim();
        if (draftName) {
          this.editName = draftName;
          sessionStorage.removeItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY);
        }

        const draftPhone = sessionStorage.getItem(CHANGARRO_PROFILE_PHONE_DRAFT_KEY)?.trim();
        if (draftPhone) {
          this.editPhone =
            draftPhone.length >= 10
              ? `${draftPhone.slice(0, 2)} ${draftPhone.slice(2, 6)} ${draftPhone.slice(6)}`
              : draftPhone;
          sessionStorage.removeItem(CHANGARRO_PROFILE_PHONE_DRAFT_KEY);
        }

        this.savedName = this.editName;
        this.savedPhone = this.editPhone;

        this.stats = stats || this.buildStatsFromProfile(profile);
        this.sellos = this.mergeEarnedStamps(stamps, profile.stampIds || []);
        this.activity = activity;
        this.collection = collection;

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loadError = err?.error?.error || err?.message || 'No se pudo cargar tu perfil';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  get displayName(): string {
    const t = this.editName.trim();
    return t || 'Vecino del barrio';
  }

  get accountTypeLabel(): string {
    const role = (this.userRole || '').toUpperCase();
    if (role === 'BUSINESS') return 'Negocio';
    if (role === 'ADMIN') return 'Administrador';
    return 'Cliente';
  }


  private buildStatsFromProfile(profile: { visitedCount?: number; favoriteCount?: number; reviewCount?: number; stampCount?: number }): UserStat[] {
    return [
      { v: String(profile.visitedCount ?? 0), l: 'Visitados', emoji: '🏃' },
      { v: String(profile.favoriteCount ?? 0), l: 'Favoritos', emoji: '♥' },
      { v: String(profile.reviewCount ?? 0), l: 'Reseñas', emoji: '✍️' },
      { v: String(profile.stampCount ?? 0), l: 'Sellos', emoji: '🏆' },
    ];
  }

  private mergeEarnedStamps(stamps: UserStamp[], earnedIds: string[]): UserStamp[] {
    if (!earnedIds.length) return stamps;
    const earned = new Set(earnedIds);
    return stamps.map(stamp => ({ ...stamp, got: stamp.got || earned.has(stamp.id) }));
  }

  get avatarInitials(): string {
    return initialsFromDisplayName(this.editName);
  }

  avatarPlaceholderGradient(): string {
    return gradientFromName(this.editName);
  }

  get earnedStampCount(): number {
    return this.sellos.filter(s => s.got).length;
  }

  get memberSinceYear(): string {
    if (!this.userCreatedAt) return '';
    return new Date(this.userCreatedAt).getFullYear().toString();
  }

  onProfilePhotoSelect(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file?.type.startsWith('image/')) {
      input.value = '';
      return;
    }
    if (!this.editing) {
      this.startEditing();
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePhotoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  removeProfilePhoto(): void {
    this.profilePhotoUrl = null;
  }

  startEditing(): void {
    this.editPhotoSnapshot = this.profilePhotoUrl;
    this.editing = true;
    this.saveError = '';
  }

  cancelEditing(): void {
    this.editing = false;
    this.editName = this.savedName;
    this.editPhone = this.savedPhone;
    this.profilePhotoUrl = this.editPhotoSnapshot;
    this.saveError = '';
  }

  saveProfile(): void {
    const n = this.editName.trim();
    const p = this.editPhone.trim();

    if (!n) {
      this.saveError = 'El nombre no puede quedar vacío';
      return;
    }

    this.saving = true;
    this.saveError = '';
    this.saveSuccess = false;

    this.userApi
      .updateMyProfile({
        name: n,
        phone: p,
        whatsapp: p,
        profilePhotoUrl: this.profilePhotoUrl || '',
      })
      .subscribe({
        next: (profile) => {
          this.savedName = profile.name || n;
          this.savedPhone = profile.whatsapp || profile.phone || p;
          this.editName = this.savedName;
          this.editPhone = this.savedPhone;
          this.userLevel = profile.level ?? this.userLevel;
          this.userLevelName = profile.levelName || this.userLevelName;
          this.userCoins = profile.coins ?? this.userCoins;
          this.editing = false;
          this.saving = false;
          this.saveSuccess = true;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.saveSuccess = false;
            this.cdr.markForCheck();
          }, 2400);
        },
        error: (err) => {
          this.saveError =
            err?.error?.error ||
            err?.error?.details?.[0]?.message ||
            err?.message ||
            'No se pudo guardar tu perfil';
          this.saving = false;
          this.cdr.markForCheck();
        },
      });
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
    this.deleteConfirmText = '';
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteConfirmText = '';
  }

  confirmDelete(): void {
    if (this.deleteConfirmText === 'ELIMINAR') {
      this.showDeleteModal = false;
    }
  }

  cerrarSesion(): void {
    this.auth.logout();
  }
}
