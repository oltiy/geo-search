interface Languages {
  [key: string]: string;
}

interface Currency {
  symbol: string;
}

interface Common {
  common: string;
}

interface Currencies {
  [code: string]: Currency;
}

export interface Country {
  capital: string[];
  currencies: Currencies;
  languages: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}
