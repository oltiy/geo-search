export interface CountryFromApi {
  name: { common: string };
  capital: string[];
  currencies?: { [key: string]: Currency };
  languages?: { [key: string]: string };
  population: number;
  flags: { png?: string; svg?: string };
}

export interface CountryDisplay {
  commonName?: string;
  capital: string[];
  currencies?: string[];
  languages?: string[];
  population: number;
  flags: {
    png?: string;
    svg?: string;
  };
}

interface Currency {
  name: string;
  symbol: string;
}
