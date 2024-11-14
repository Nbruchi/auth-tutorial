import {db} from "@/lib/db"

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verificatinToken.findUnique({
            where: {token}
        });
    }catch (error) {
        return null;
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verificatinToken.findFirst({
            where: {email}
        });
    }catch (error) {
        return null;
    }
}

