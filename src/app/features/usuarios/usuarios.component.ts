import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { UsuariosService, Usuario } from '../../core/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  nuevoUsuario = {
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    password: '',
    rol: 'Recepción',
    estado: 'Activo'
  };

  modoEdicion = false;
  usuarioEditando: string | null = null;
  guardando = false;

  constructor(
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getAll().subscribe({
      next: r => this.usuarios = r,
      error: () => this.toastService.error('Error al cargar los usuarios.')
    });
  }

  guardarUsuario(): void {
    this.guardando = true;

    if (this.modoEdicion && this.usuarioEditando !== null) {
      this.usuariosService.update(this.usuarioEditando, this.nuevoUsuario).subscribe({
        next: () => {
          this.guardando = false;
          this.toastService.success('Usuario actualizado correctamente.');
          this.cancelar();
          this.cargarUsuarios();
        },
        error: () => {
          this.guardando = false;
          this.toastService.error('Error al actualizar el usuario.');
        }
      });
      return;
    }

    this.usuariosService.create(this.nuevoUsuario).subscribe({
      next: () => {
        this.guardando = false;
        this.toastService.success('Usuario creado correctamente.');
        this.cancelar();
        this.cargarUsuarios();
      },
      error: () => {
        this.guardando = false;
        this.toastService.error('Error al crear el usuario.');
      }
    });
  }

  editar(usuario: Usuario): void {
    this.modoEdicion = true;
    this.usuarioEditando = usuario.id;

    this.nuevoUsuario = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      usuario: usuario.usuario,
      password: '',
      rol: usuario.rol,
      estado: usuario.estado
    };
  }

  async eliminar(id: string): Promise<void> {
    const confirmado = await this.confirm.confirm({
      title: 'Eliminar usuario',
      message: '¿Deseas eliminar este usuario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger'
    });

    if (!confirmado) {
      return;
    }

    this.usuariosService.delete(id).subscribe({
      next: () => {
        this.toastService.success('Usuario eliminado correctamente.');
        this.cargarUsuarios();
      },
      error: () => {
        this.toastService.error('Error al eliminar el usuario.');
      }
    });
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.usuarioEditando = null;

    this.nuevoUsuario = {
      nombre: '',
      apellido: '',
      correo: '',
      usuario: '',
      password: '',
      rol: 'Recepción',
      estado: 'Activo'
    };
  }

  obtenerUsuariosActivos(): number {
    return this.usuarios.filter(u => u.estado === 'Activo').length;
  }

  obtenerAdministradores(): number {
    return this.usuarios.filter(u => u.rol === 'Administrador').length;
  }

  obtenerRecepcionistas(): number {
    return this.usuarios.filter(u => u.rol === 'Recepción').length;
  }
}