# Auth module README.md

## Architecture

```
/src/app/features/auth
    /dto
        // your dto's (Data Transfer Object) - response to object that can return Model from Domain
    /repo
        // your http Services (GET, POST, PUT, DELETE) - simple requests only (no logic)
    /domain
        // your Models (POST, PUT, DELETE) and stores (GET)
```