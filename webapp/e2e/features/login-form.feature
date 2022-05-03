Feature: Inicar sesión

Scenario: Usuario inicia sesión correctamente
  Given Un usuario sin login
  When Rellena el formulario correctamente
  Then Se le muestra el catálogo

Scenario: Usuario inicia sesión sin cuenta
  Given Un usuario sin login
  When Rellena el formulario incorrectamente
  Then Le aparece un error