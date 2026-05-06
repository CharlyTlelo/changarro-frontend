import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { AuthService } from '../../shared/services/auth.service';
import {
  CHANGARRO_PROFILE_AVATAR_DRAFT_KEY,
  CHANGARRO_PROFILE_NAME_DRAFT_KEY,
  CHANGARRO_PROFILE_PHONE_DRAFT_KEY,
  gradientFromName,
  initialsFromDisplayName,
} from '../../shared/utils/avatar-placeholder';
import { COLLECTION, SELLOS } from '../../shared/data/mock-data';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, TabBar, Sidebar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  private readonly auth = inject(AuthService);

  collection = COLLECTION;
  sellos = SELLOS;

  stats = [
    { v: '47', l: 'Visitados', emoji: '🚶' },
    { v: '13', l: 'Favoritos', emoji: '♥' },
    { v: '21', l: 'Reseñas', emoji: '✍️' },
    { v: '4', l: 'Sellos', emoji: '🏆' },
  ];

  tabs = ['Mi colección', 'Reseñas', 'Listas'];
  activeTab = 'Mi colección';

  editing = false;
  editName = 'María Hernández';
  editPhone = '55 1234 5678';
  profilePhotoUrl: string | null = null;
  private editPhotoSnapshot: string | null = null;

  private savedName = 'María Hernández';
  private savedPhone = '55 1234 5678';

  ngOnInit(): void {
    const draftAvatar = sessionStorage.getItem(CHANGARRO_PROFILE_AVATAR_DRAFT_KEY);
    if (draftAvatar) {
      this.profilePhotoUrl = draftAvatar;
      sessionStorage.removeItem(CHANGARRO_PROFILE_AVATAR_DRAFT_KEY);
    }

    const draftName = sessionStorage.getItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY)?.trim();
    if (draftName) {
      this.editName = draftName;
      sessionStorage.removeItem(CHANGARRO_PROFILE_NAME_DRAFT_KEY);
    } else {
      const u = this.auth.user();
      if (u?.name?.trim()) {
        this.editName = u.name.trim();
      }
    }

    const draftPhone = sessionStorage.getItem(CHANGARRO_PROFILE_PHONE_DRAFT_KEY)?.trim();
    if (draftPhone) {
      const formatted =
        draftPhone.length >= 10
          ? `${draftPhone.slice(0, 2)} ${draftPhone.slice(2, 6)} ${draftPhone.slice(6)}`
          : draftPhone;
      this.editPhone = formatted;
      sessionStorage.removeItem(CHANGARRO_PROFILE_PHONE_DRAFT_KEY);
    }

    this.savedName = this.editName;
    this.savedPhone = this.editPhone;
  }

  get displayName(): string {
    const t = this.editName.trim();
    return t || 'Vecino del barrio';
  }

  get avatarInitials(): string {
    return initialsFromDisplayName(this.editName);
  }

  avatarPlaceholderGradient(): string {
    return gradientFromName(this.editName);
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

  showDeleteModal = false;
  deleteConfirmText = '';

  activity = [
    { emoji: '🌮', text: 'Visitaste Tacos Don Juan', when: 'Hace 2h', coins: '+20' },
    { emoji: '⭐', text: 'Reseña en Café Avellaneda', when: 'Hace 1 día', coins: '+50' },
    { emoji: '🥖', text: 'Canjeaste en Panadería Sol', when: 'Hace 3 días', coins: '-400' },
    { emoji: '💇', text: 'Visitaste Estética Rocío', when: 'Hace 5 días', coins: '+20' },
    { emoji: '🏆', text: 'Sello "Taquero" obtenido', when: 'Hace 1 sem', coins: '+100' },
  ];

  startEditing() {
    this.editPhotoSnapshot = this.profilePhotoUrl;
    this.editing = true;
  }

  cancelEditing() {
    this.editing = false;
    this.editName = this.savedName;
    this.editPhone = this.savedPhone;
    this.profilePhotoUrl = this.editPhotoSnapshot;
  }

  saveProfile() {
    const n = this.editName.trim();
    const p = this.editPhone.trim();
    if (n) {
      this.savedName = n;
      this.editName = n;
    }
    if (p) {
      this.savedPhone = p;
      this.editPhone = p;
    }
    this.editing = false;
  }

  openDeleteModal() {
    this.showDeleteModal = true;
    this.deleteConfirmText = '';
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteConfirmText = '';
  }

  confirmDelete() {
    if (this.deleteConfirmText === 'ELIMINAR') {
      this.showDeleteModal = false;
    }
  }

  cerrarSesion(): void {
    this.auth.logout();
  }
}
