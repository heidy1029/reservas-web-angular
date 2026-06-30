import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario{

  id:number;
  nombre:string;
  apellido:string;
  correo:string;
  usuario:string;
  rol:string;
  estado:string;
  ultimoAcceso:string;

}

@Component({
  selector: 'app-usuarios',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./usuarios.component.html',
  styleUrl:'./usuarios.component.css'
})
export class UsuariosComponent{

  usuarios:Usuario[]=[

    {
      id:1,
      nombre:'Freddie',
      apellido:'Lucumí',
      correo:'freddie@electroreserve.com',
      usuario:'admin',
      rol:'Administrador',
      estado:'Activo',
      ultimoAcceso:'Hoy 10:35'
    },

    {
      id:2,
      nombre:'Laura',
      apellido:'Martínez',
      correo:'laura@electroreserve.com',
      usuario:'recepcion',
      rol:'Recepción',
      estado:'Activo',
      ultimoAcceso:'Hoy 09:10'
    }

  ];

  nuevoUsuario={

    nombre:'',
    apellido:'',
    correo:'',
    usuario:'',
    password:'',
    rol:'Recepción',
    estado:'Activo'

  };

  modoEdicion=false;

  usuarioEditando:number|null=null;

  guardarUsuario(){

    if(this.modoEdicion){

      const usuario=this.usuarios.find(x=>x.id==this.usuarioEditando);

      if(usuario){

        usuario.nombre=this.nuevoUsuario.nombre;
        usuario.apellido=this.nuevoUsuario.apellido;
        usuario.correo=this.nuevoUsuario.correo;
        usuario.usuario=this.nuevoUsuario.usuario;
        usuario.rol=this.nuevoUsuario.rol;
        usuario.estado=this.nuevoUsuario.estado;

      }

    }else{

      this.usuarios.unshift({

        id:this.usuarios.length+1,

        nombre:this.nuevoUsuario.nombre,
        apellido:this.nuevoUsuario.apellido,
        correo:this.nuevoUsuario.correo,
        usuario:this.nuevoUsuario.usuario,
        rol:this.nuevoUsuario.rol,
        estado:this.nuevoUsuario.estado,
        ultimoAcceso:'Nunca'

      });

    }

    this.cancelar();

  }

  editar(usuario:Usuario){

    this.modoEdicion=true;

    this.usuarioEditando=usuario.id;

    this.nuevoUsuario={

      nombre:usuario.nombre,
      apellido:usuario.apellido,
      correo:usuario.correo,
      usuario:usuario.usuario,
      password:'',
      rol:usuario.rol,
      estado:usuario.estado

    };

  }

  eliminar(id:number){

    if(confirm('¿Eliminar usuario?')){

      this.usuarios=this.usuarios.filter(x=>x.id!=id);

    }

  }

  cancelar(){

    this.modoEdicion=false;

    this.usuarioEditando=null;

    this.nuevoUsuario={

      nombre:'',
      apellido:'',
      correo:'',
      usuario:'',
      password:'',
      rol:'Recepción',
      estado:'Activo'

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