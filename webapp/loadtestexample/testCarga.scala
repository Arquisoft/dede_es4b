package testCarga;
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class TestPrueba extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList())
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0")

  private val headers_0 = Map(
    "Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Upgrade-Insecure-Requests" -> "1"
  )

  private val headers_3 = Map(
    "Access-Control-Request-Headers" -> "content-type",
    "Access-Control-Request-Method" -> "POST",
    "Origin" -> "http://localhost:3000"
  )

  private val scn = scenario("GetProducts")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/productos")
            .headers(headers_0)
        )
    )
    .pause(4)
    .exec(
      http("request_3")
        .get("/productos/62650ffa22989cae41254c37")
        .headers(headers_0)
        .resources(
          http("request_4")
            .get("/carrito")
            .headers(headers_0)
        )
    )

  //Con 85, 10 carga alta sin perder peticiones.
  //Con 95, 10 ya suele perder peticiones.
  //Con 26, 500 tiempo de espera bueno y no pierde peticiones.
  //Con 27, 500 mal tiempo de espera y pierde peticones.
  setUp(scn.inject(constantUsersPerSec(27).during(500))).protocols(httpProtocol)
}