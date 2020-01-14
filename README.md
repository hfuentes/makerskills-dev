# Makerskills

Prueba concepto Angular 8 + Firebase Auth (Google) + Firebase Firestore

### Algunos comandos

`ng serve` servidor desarrollo local

`ng build --prod` genera carpeta dist/** para deploy a firebase

`firebase login` login máquina local para proyecto firebase

`firebase init` inicio servicios firebase (hosting)

`firebase deploy` deploy hacia firebase (hosting) desde build (dist/**, generado por angular)

`firebase deploy --only firestore:rules` subir modificación en reglas firestore

### Componentes transversales

<app-loading [loading]="this.loading" [error]="this.error">
  contenido a mostrar
</app-loading>

`loading` variable de tipo bolean que le indica al componente si debe mostrar html de carga.

`error` variable de tipo object con los siguientes atributos:
  { status: number, message: string }
  en caso de inicializar el objeto, se mostrara mensaje de error