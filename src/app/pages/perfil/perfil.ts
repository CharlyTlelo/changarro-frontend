import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TabBar } from '../../shared/components/tab-bar/tab-bar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { COLLECTION, SELLOS } from '../../shared/data/mock-data';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, TabBar, Sidebar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  private readonly router = inject(Router);

  collection = COLLECTION;
  sellos = SELLOS;

  stats = [
    { v: '47', l: 'Visitados', emoji: '🚶' },
    { v: '13', l: 'Favoritos', emoji: '♥' },
    { v: '21', l: 'Reseñas',   emoji: '✍️' },
    { v: '4',  l: 'Sellos',    emoji: '🏆' },
  ];

  tabs = ['Mi colección', 'Reseñas', 'Listas'];
  activeTab = 'Mi colección';

  // Edit state
  editing = false;
  editName = 'María Hernández';
  editPhone = '55 1234 5678';
  profilePhotoUrl: string | null = null;
  private editPhotoSnapshot: string | null = null;

  get avatarLetter(): string {
    const n = this.editName.trim();
    return n ? n.charAt(0).toUpperCase() : '?';
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

  // Delete modal
  showDeleteModal = false;
  deleteConfirmText = '';

  // Activity items for tablet
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
    this.editName = 'María Hernández';
    this.editPhone = '55 1234 5678';
    this.profilePhotoUrl = this.editPhotoSnapshot;
  }

  saveProfile() {
    // TODO: call backend PATCH /api/users/me
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
      // TODO: call backend DELETE /api/users/me
      this.showDeleteModal = false;
    }
  }

  cerrarSesion(): void {
    // TODO: llamar POST /auth/logout y borrar tokens almacenados
    void this.router.navigate(['/login']);
  }
}
