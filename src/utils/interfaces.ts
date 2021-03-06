export interface GInterface {
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  phone: string;
  stack: string;
  github_url?: string;
  linkedin_url?: string;
  technologies: string;
  proficiency?: string;
  location?: string;
  profile?: string;
  experience?: string;
  yoe?: string;
}

export interface EInterface {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  stack: string;
  technologies: string;
}

export interface userInterface {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}
export interface UserErrorInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
