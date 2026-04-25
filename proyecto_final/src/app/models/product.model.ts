/*
 * Objetivo del archivo:
 * Mostrar remapeo entre API y ViewModel.
 *
 * Ejercicio para el estudiante:
 * ProductApi representa la respuesta del backend.
 * ProductView representa lo que realmente necesita el HTML.
 *
 * Debes completar el mapper para que todos los campos se vean correctamente.
 */
export interface ProductApi {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  category_name: string;
  created_at: string;
}

export interface ProductView {
  id: number;
  name: string;
  priceLabel: string;
  /*
   * TODO estudiante:
   * Completar el calculo de stockLabel en mapProductApiToView().
   * Resultado esperado: "15 unidades", "Sin stock" o un texto similar.
   */
  stockLabel: string;
  /*
   * TODO estudiante:
   * Completar categoryName en el mapper usando product.category_name.
   */
  categoryName: string;
}
