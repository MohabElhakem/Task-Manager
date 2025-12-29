import bcrypt from 'bcrypt';

export const validPassword = async(
        password:string , 
        HashedPassword:string
    ):Promise<boolean> => {
    try {
        return await bcrypt.compare(password , HashedPassword);
    } catch (error) {
        console.log("error happend while validating the password", error)
        return false
    }
}