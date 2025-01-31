import { useAuth } from "../../auth/AuthComponent";
import UserService from "../../../shared/services/user.service";
import TokenService from "../../../shared/services/token.service";
import { useEffect, useState } from "react";
import SettingsInfo from "../SettingsInfo";

export default function Academics() {
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
            <SettingsInfo title="First Name" data={user ? user?.firstName : 'n/a'}/>
            <SettingsInfo title="Last Name" data={user ? user?.lastName : 'n/a'}/>
            <SettingsInfo title="Degree" data={user ? user?.academicInfo?.bachelorsDegree : 'n/a'}/>
            <SettingsInfo title="Major" data={user ? user?.academicInfo?.major : 'n/a'}/>
            <SettingsInfo title="Concentration" data={user ? user?.academicInfo?.concentration : 'n/a'}/>
            <SettingsInfo title="Courses Taken/Failed/In Progress" data={user ? user?.academicInfo?.coursesTakenFailedOrInProgress?.length.toString() : 'n/a'}/>
            <SettingsInfo title="Honors Student" data={user ? user?.academicInfo?.isHonorsStudent?.toString() : 'n/a'}/>
            <SettingsInfo title="Courses Completed Successfully" data={user ? user?.academicInfo?.totalNumberOfCreditsTaken : 'n/a'}/>
        </div>
    );
}