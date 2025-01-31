import { useAuth } from "../../auth/AuthComponent";
import UserService from "../../../shared/services/user.service";
import TokenService from "../../../shared/services/token.service";
import { useEffect, useState } from "react";
import SettingsInfo from "../SettingsInfo";

export default function Preferences() {
    const { token } = useAuth();
    const [user, setUser] = useState<any>('')

    useEffect(() => {

        async function getUser(): Promise<any>{
            if(!token) return

            try {
                const tokenService = new TokenService();
                const userId = await tokenService.getUserIdFromToken(token);

                if (!userId) {
                    throw new Error("Failed to retrieve userId from token.");
                }

                const userService = new UserService();
                return (await userService.getUserById(userId))
                
            } catch {
                return
            }
        }
        getUser().then((user) => setUser(user))

    }, [token, user])
    return (
        <div className="flex flex-grow h-screen flex-col space-y-4 text-black py-5 px-5">
            {/* array.map is not used for order / formating purposes  */}
            <SettingsInfo title="Preferred Credit Hours" data={user ? user?.preferencesInfo?.preferredCreditHours : 'n/a'}/>
            <SettingsInfo title="Degree" data={user ? user?.preferencesInfo?.summerWinterCoursesFrequency : 'n/a'}/>
           
        </div>
    );
}