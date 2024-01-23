import { FC } from "react"
import "./Home_style.css"

const Home: FC = () => (
  <section id="content">
    <article className="article-1">
      <div className="art1_text">
        <span className="color-gold">T</span>axi
      </div>
      <div className="art1_content">
        zawsze jesteśmy
        <br />
        do twoich usług
      </div>
    </article>

    <article className="article-2">
      <div>
        <img src="/src/assets/images/phone-icon.png" width={312} height={312} />
      </div>
      <div className="art2_content">
        <div className="art2_content-t1">24 godziny na dobę</div>
        <div className="art2_content-t2">897 231 564</div>
        <div className="art2_content-t3">
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
    </article>

    <article className="article-3">
      <div className="art3_boxrow">
        <div className="art3_box">
          <span className="color-gold">Szybko &amp;</span>
          <br />
          <span style={{ fontWeight: "100" }}>bezpiecznie</span>
        </div>
        <div style={{ textAlign: "end" }} className="art3_box">
          <span className="color-gold">Najlepsze</span>
          <br />
          <span style={{ fontWeight: "100" }}>ceny</span>
        </div>
      </div>
      <div className="art3_boxrow">
        <div className="art3_box">
          <span className="color-gold">Luksusowe</span>
          <br />
          <span style={{ fontWeight: "100" }}>samochody</span>
        </div>
        <div style={{ textAlign: "end" }} className="art3_box">
          <span className="color-gold">Genialni</span>
          <br />
          <span style={{ fontWeight: "100" }}>kierowcy</span>
        </div>
      </div>
    </article>

    <article className="article-4">
      <div className="art4_header">
        O <span style={{ fontWeight: "100" }}>firmie</span>
      </div>
      <div className="art4_text">
        Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco.
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div>
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nos trud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat.
        </div>
        <div>
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nos trud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat.
        </div>
      </div>
    </article>
  </section>
)

export default Home
