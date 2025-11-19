import React, { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./HomePage.css";
import Header from "../../components/Header/Header";
import { FaLightbulb } from "react-icons/fa";
import { ProfessionCard } from "../../components/ProfessionCard/ProfessionCard";
import type { Professional } from "../../interfaces/Professional";
import { API_BASE_URL } from "../../config/Config";
import axios from "axios";

function HomePage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API_BASE_URL}/professionals`);
      setProfessionals(res.data);
    };
    load();
  }, []);

  const professions = Array.from(
    new Set(professionals.map((p) => p.profession))
  ).filter((prof) => prof.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="home-page-container">
      <header className="header-container">
        <Header />
      </header>
      <div className="search-bar-container">
        <div className="search-heading">
          <FaLightbulb style={{ marginRight: "0.5rem" }} />
          Expert solutions for you
        </div>
        <SearchBar value={search} onChange={setSearch} />
        <div className="cards-container">
          {professions.map((prof, index) => (
            <ProfessionCard key={index} profession={prof} />
          ))}
        </div>
      </div>
      <footer className="footer-container"></footer>
    </div>
  );
}

export default HomePage;
