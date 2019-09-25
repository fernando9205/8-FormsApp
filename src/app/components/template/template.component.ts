import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UsuarioModel } from "../../models/usuario.model";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styles: [
    `
      .ng-invalid .ng-touched:not(form) {
        border: 1px solid red;
      }
    `
  ]
})
export class TemplateComponent implements OnInit {
  usuario: UsuarioModel;

  paises = [
    {
      codigo: "COL",
      nombre: "Colombia"
    },
    {
      codigo: "ESP",
      nombre: "España"
    },
    {
      codigo: "CRI",
      nombre: "Costa Rica"
    }
  ];

  sexos: string[] = ['Hombre', 'Mujer'];

  constructor() {
    this.usuario = new UsuarioModel();
    this.usuario.pais = "0";
    this.usuario.sexo = 'Masculino';
    this.usuario.acepta = false;
  }

  ngOnInit() {}

  guardar(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    console.log(form);
  }
}
