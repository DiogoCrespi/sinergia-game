# Modelos 3D - Sinergia Game

Esta pasta contém os modelos 3D do jogo.

## Estrutura de Pastas

```
models/
├── characters/     # Modelos de personagens (GLB/GLTF)
├── environment/    # Modelos do ambiente (mesa, objetos, etc.)
└── props/         # Props e objetos decorativos
```

## Personagens

Os modelos de personagens devem ser salvos em formato **GLB** (recomendado) ou **GLTF**.

### Nomenclatura
- Nome do arquivo deve corresponder ao `characterId` do personagem
- Exemplo: `carlos.glb`, `sara.glb`, `ana.glb`, `marcos.glb`

### Especificações Técnicas

**Recomendações:**
- **Formato**: GLB (binário, mais compacto)
- **Geometria**: 500-1000 triângulos por personagem (low poly)
- **Texturas**: Estilizadas, não fotorealistas
- **Tamanho**: < 2MB por modelo (ideal)
- **Animações**: Incluir animações nomeadas:
  - `idle` - Animação de repouso
  - `worried` - Preocupado
  - `relieved` - Aliviado
  - `angry` - Irritado
  - `happy` - Feliz
  - `sad` - Triste

### Como Adicionar um Modelo

1. **Criar/Obter modelo 3D** (Blender, asset stores, etc.)
2. **Otimizar modelo**:
   - Reduzir poly count
   - Comprimir texturas
   - Exportar em GLB
3. **Salvar na pasta correta**:
   - Personagens: `public/models/characters/[nome].glb`
4. **O modelo será carregado automaticamente** quando o personagem aparecer no jogo

### Fallback

Se um modelo não for encontrado, o jogo usa automaticamente um **placeholder** (geometria simples) para não quebrar a experiência.

## Ambiente

Modelos do ambiente (mesa, cadeira, objetos) devem seguir as mesmas especificações técnicas.

## Ferramentas Recomendadas

- **Blender** (gratuito) - Para criar/editar modelos
- **gltfjsx** - Para gerar componentes React a partir de modelos GLTF
- **glTF Validator** - Para validar modelos antes de usar

## Recursos

- [glTF Specification](https://www.khronos.org/gltf/)
- [Blender glTF Export Guide](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
- [Three.js glTF Loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)


