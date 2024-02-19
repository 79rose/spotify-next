"use client";

import Modal from "@/components/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { on } from "events";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthModal = () => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { isOpen, onClose } = useAuthModal();
    
    const onChange = (open:boolean) :void => {
        if (!open) {
            onClose();
        }
    }
    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    
    },[session,router, onClose])
    return (
        <Modal
            title="Welcome Back!"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                providers={['github', 'google','spotify'] }
                theme="dark"
                magicLink
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e',
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
};

export default AuthModal;