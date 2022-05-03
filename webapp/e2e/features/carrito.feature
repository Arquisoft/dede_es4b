Feature: Añadir al carrito

Scenario: Usuario añade producto al carrito
  Given Un usuario en los detalles de un producto
  When Añade producto al carrito
  Then El carrito tiene  un producto más