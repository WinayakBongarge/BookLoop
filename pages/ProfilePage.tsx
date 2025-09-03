
import React from 'react';
import Button from '../components/Button';

interface ProfileSectionProps {
    title: string;
    children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
    <div className="bg-surface rounded-lg shadow-md p-6">
        <h3 className="text-xl font-montserrat font-semibold border-b pb-3 mb-4">{title}</h3>
        {children}
    </div>
);

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input {...props} className="w-full p-2.5 border border-neutral-medium rounded-md focus:ring-primary focus:border-primary transition bg-background text-on-surface placeholder-gray-400" />
    </div>
);


const ProfilePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-montserrat font-bold mb-6">My Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface rounded-lg shadow-md p-6 text-center">
                        <img src="https://picsum.photos/seed/user/200/200" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
                        <h2 className="text-2xl font-bold font-montserrat">Rohan Gupta</h2>
                        <p className="text-gray-500">rohan.gupta@example.com</p>
                        <Button variant="secondary" className="mt-4 !text-sm !px-4 !py-2">Upload Picture</Button>
                    </div>
                    <ProfileSection title="Location">
                        <p className="text-gray-600">42, MG Road, Sector 18<br/>Noida, Uttar Pradesh - 201301</p>
                        <Button variant="secondary" className="w-full mt-4">Change Location</Button>
                    </ProfileSection>
                </div>
                <div className="lg:col-span-2 space-y-6">
                     <ProfileSection title="Personal Information">
                        <div className="space-y-4">
                            <InputField label="Full Name" type="text" defaultValue="Rohan Gupta" />
                            <InputField label="Email Address" type="email" defaultValue="rohan.gupta@example.com" />
                            <InputField label="Phone Number" type="tel" defaultValue="+91 98765 43210" />
                            <div className="text-right pt-2">
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </ProfileSection>
                    <ProfileSection title="Security">
                         <div className="space-y-4">
                            <InputField label="New Password" type="password" placeholder="••••••••" />
                            <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
                             <div className="text-right pt-2">
                                <Button>Update Password</Button>
                            </div>
                         </div>
                    </ProfileSection>
                    <div className="flex justify-between items-center mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                        <Button variant="danger">Log Out</Button>
                        <a href="#" className="text-sm text-red-600 hover:underline font-semibold">Delete Account</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
