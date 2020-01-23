# Makerskills

Prueba concepto Angular 8 + Firebase Auth (Google) + Firebase Firestore

## Algunos comandos

`ng serve` servidor desarrollo local

`ng build --prod` genera carpeta dist/** para deploy a firebase

`firebase login` login máquina local para proyecto firebase

`firebase init` inicio servicios firebase (hosting)

`firebase deploy` deploy hacia firebase (hosting) desde build (dist/**, generado por angular)

`firebase deploy --only firestore:rules` subir modificación en reglas firestore

### Despliegues

`sh deploy.sh -t firebase` script despliegue Firebase

```
Usage: deploy.sh [
  -t Target: ['firebase', 'docker'] # required
  -e Environment: ['dev','prod'] # default: 'dev'
  -p Firebase Project: [string] # default: 'makerskills-develop'
  -o Firebase Options: [string] # default: 'hosting,firestore:rules'
]
```

Para hacer despliegue por medio de GitHub (develop) tan solo se debe subir el código a la rama: `deploy-firebase-develop`. Luego la configuración del GitHub/Workflow: `/.github/workflows/deploy-firebase-develop.yml` ejecutará el deploy.

`sh deploy.sh -t docker` script despliegue Docker (requisitos: keychain, sshpass, expect)

## Componentes transversales
### Loading

```
<app-error-handler [loading]="loading: boolean" [error]="error: Error" [settings]="settings: Settings">
  ...<div>contenido a mostrar</div>...
</app-error-handler>
```

### Mostrar tiene roles

```
<div *ngIf="auth.matchingRoles(roles: Array<string> = ['profile','dashboard', ...], strict?: boolean)">
  ...<div>contenido a mostrar</div>...
</app-error-handler>
```

`roles` array de roles (string), debe contener al menos uno.

`strict` (estricto) por defecto es `true`, significa que el usuario debe tener todos los roles pedidos, en caso de ser `false`, bastará con que tenga uno de los roles pedidos.

### Radar Chart

Ejemplo: https://jonasrenault.github.io/fortune100/

GitHub: https://github.com/jonasrenault/fortune100/blob/master/src/app/radar-chart.service.ts