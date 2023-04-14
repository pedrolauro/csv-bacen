
export const inputSchemaBacen = {
  type: "array",
  items: {
    properties: {
      ISPB: { "type": "string" },
      Nome_Reduzido: { "type": "string" },
      Numero_Codigo: { "type": "string" },
      Participa_da_Compe: { "type": "string" },
      Acesso_Principal: { "type": "string" },
      Nome_Extenso: { "type": "string" },
      Inicio_da_Operacao: { "type": "string" }
    },
    required: ["ISPB", "Nome_Reduzido", "Numero_Codigo", "Participa_da_Compe", "Acesso_Principal", "Nome_Extenso","Inicio_da_Operacao"]
  }
}