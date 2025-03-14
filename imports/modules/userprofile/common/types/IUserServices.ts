import { IServiceGithubData } from "../../backend/services/githubOauth";
import { IServiceGoogleData } from "../../backend/services/googleOauth";

interface IUserServices {
    github: IServiceGithubData; 
    google: IServiceGoogleData;
};

export default IUserServices;