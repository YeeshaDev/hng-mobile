import {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { Country } from "@/types";

interface LanguageInfo {
  code: string;
  name: string;
}
interface CountryContextType {
  countries: Country[];
  filteredCountries: Country[];
  isLoading: boolean;
  search: string;
  setSearch: (search: string) => void;
  selectedRegions: string[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedLanguageCode: string;
  selectedTimezones: string[];
  setSelectedTimezones: React.Dispatch<React.SetStateAction<string[]>>;
  continents: string[];
  languages: LanguageInfo[];
  timezones: string[];
  handleReset: () => void;
}

const AppContext = createContext<CountryContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("");

  const { data: countries = [], isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      return response.json() as Promise<Country[]>;
    },
  });

  const continents = useMemo(() => {
    const uniqueRegions = new Set(countries.map((country) => country.region));
    return Array.from(uniqueRegions).sort();
  }, [countries]);

  const languages = useMemo(() => {
    const languageMap = new Map<string, LanguageInfo>();
    countries.forEach((country) => {
      if (country.languages) {
        Object.entries(country.languages).forEach(([code, name]) => {
          languageMap.set(name, { code, name });
        });
      }
    });
    return Array.from(languageMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [countries]);

  const timezones = useMemo(() => {
    const uniqueTimezones = new Set<string>();
    countries.forEach((country) => {
      country.timezones.forEach((timezone) => uniqueTimezones.add(timezone));
    });
    return Array.from(uniqueTimezones).sort();
  }, [countries]);

  const handleSetLanguage = (languageName: string) => {
    setSelectedLanguage(languageName);
    const languageInfo = languages.find((lang) => lang?.name === languageName);
    setSelectedLanguageCode(languageInfo?.code || "");
  };

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(search.toLowerCase());

        const isRegion =
          selectedRegions.length === 0 ||
          selectedRegions.includes(country.region);

        const isLanguage =
          !selectedLanguage ||
          (country.languages &&
            Object.entries(country.languages).some(
              ([code, name]) => name === selectedLanguage
            ));

        const isTimezone =
          selectedTimezones.length === 0 ||
          (country.timezones &&
            country.timezones.some((timezone) =>
              selectedTimezones.includes(timezone)
            ));

        return matchesSearch && isRegion && isLanguage && isTimezone;
      })
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [countries, search, selectedRegions, selectedLanguage, selectedTimezones]);

  const handleReset = () => {
    setSelectedRegions([]);
    setSelectedTimezones([]);
  };
  const value = {
    countries,
    filteredCountries,
    isLoading,
    search,
    setSearch,
    selectedRegions,
    setSelectedRegions,
    selectedLanguage,
    setSelectedLanguage: handleSetLanguage,
    selectedLanguageCode,
    selectedTimezones,
    setSelectedTimezones,
    continents,
    handleReset,
    languages,
    timezones,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useCountries() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountryProvider");
  }
  return context;
}
