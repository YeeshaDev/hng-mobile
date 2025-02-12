interface Covid19Info {
  total_case: string;
  total_deaths: string;
  last_updated: string;
}

interface PresidentLinks {
  self: string;
  country: string;
  picture: string;
}

export interface CurrentPresident {
  name: string;
  gender: string;
  appointment_start_date: string;
  appointment_end_date: string | null;
  href: PresidentLinks;
}

export interface CountryLinks {
  self: string;
  states: string;
  presidents: string;
  flag: string;
}

export interface CountryItems {
  name: string;
  full_name: string;
  capital: string;
  iso2: string;
  iso3: string;
  covid19: Covid19Info;
  current_president: CurrentPresident;
  currency: string;
  phone_code: string;
  continent: string;
  description: string | null;
  size: string;
  independence_date: string | null;
  population: string;
  href: CountryLinks;
}

  export type RootStackParamList = {
    CountryList: undefined;
    CountryDetail: { country: CountryItems };
  };