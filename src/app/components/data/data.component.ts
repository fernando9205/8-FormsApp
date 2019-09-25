import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.css"]
})
export class DataComponent {
  forma: FormGroup;

  usuario: object = {
    nombreCompleto: {
      nombre: "Fernando",
      apellido: "Ruiz"
    },
    correo: "fer@algo.es"
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl("", [
          Validators.required,
          Validators.minLength(3)
        ]),
        apellido: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          this.noHerrera
        ])
      }),
      correo: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      username: new FormControl("", Validators.required, this.existeUsuario),
      password1: new FormControl("", Validators.required),
      password2: new FormControl("", Validators.required),
      pasatiempos: new FormArray([
        new FormControl("Correr", Validators.required)
      ])
    });

    // Setear data
    // this.forma.setValue(this.usuario);

    // Agregar validadores
    this.forma.controls["password2"].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    // Escuchar cambios en el formulario
    // this.forma.valueChanges.subscribe(data => {
    //   console.log("data>>>>>>", data);
    // });

    // Escuchar un componente en especifico
    this.forma.controls['username'].valueChanges.subscribe(data => {
      console.log("data>>>>>>", data);
    });
  }

  nuevoElemento() {
    (<FormArray>this.forma.controls["pasatiempos"]).push(
      new FormControl("", Validators.required)
    );
  }

  guardarCambios() {
    console.log(this.forma);
    if (this.forma.valid) {
      console.log("VALIDO");
    }

    // Resetear formulario
    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: "",
    //     apellido: ""
    //   },
    //   correo: ""
    // });
  }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value === "herrera") {
      return {
        noherrera: true
      };
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    const forma: any = this;
    if (control.value !== forma.controls["password1"].value) {
      return {
        noigual: true
      };
    }
    return null;
  }

  // Validación asincrona
  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise((resolver, rechazar) => {
      setTimeout(() => {
        if (control.value === "batman") {
          resolver({ existe: true });
        } else {
          resolver(null);
        }
      }, 3000);
    });
    return promesa;
  }
}
