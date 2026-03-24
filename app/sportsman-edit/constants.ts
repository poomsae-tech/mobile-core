export interface AthleteFormData {
  fullName: string;
  birthDate: string; // Строка для маски ручного ввода
  gender: 'Мужской' | 'Женский' | null;
  weight: string;
  beltOrRank: string | null;
  insuranceNumber: string;
  insuranceExpiry: string; // Строка
  certificateNumber: string;
}

export const INITIAL_FORM_STATE: AthleteFormData = {
  fullName: '',
  birthDate: '',
  gender: null,
  weight: '',
  beltOrRank: null,
  insuranceNumber: '',
  insuranceExpiry: '',
  certificateNumber: '',
};

// Список поясов, который мы будем использовать
export const BELTS = [
  '10 гып', '9 гып', '8 гып', '7 гып', '6 гып', '5 гып', '4 гып', '3 гып', '2 гып', '1 гып',
  '1 дан', '2 дан', '3 дан', '4 дан', '5 дан', '6 дан', '7 дан', '8 дан', '9 дан'
];