type FlagFormats = 'png' | 'svg';

export interface CountryFromApi extends CountryBase {
  name?: Record<'common', string>;
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
}

export interface CountryDisplay extends CountryBase {
  commonName?: string;
  currencies?: string[];
  languages?: string[];
}

export interface CountryBase {
  capital: string[];
  population: number;
  flags: Partial<Record<FlagFormats, string>>;
}

interface Currency {
  name: string;
  symbol: string;
}
