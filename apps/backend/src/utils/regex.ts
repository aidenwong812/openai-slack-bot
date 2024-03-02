export const COACH_EMAIL_REGEX = /^(([a-zA-Z\d+-_]*)@heycoach.ai)$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
export const NAME_REGEX = /^([a-zA-Z\s-.,'À-ÿ]*)$/;
export const PHONE_REGEX = /^(([\d]{3})[-]?([\d]{3})[-]?([\d]{4}))$/;
export const ZIPCODE_REGEX = /^[0-9]{5}$/;
export const SPECIAL_CHARS_REGEX = /[-.,'À-ÿ\s]/gi;
