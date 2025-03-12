"use client";
import { ReactNode } from "react";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    icon?: ReactNode; // ✅ Accepts any React component (like an icon)
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label, icon}) => {
    return (
        <div 
            onClick={onClick}
            className="px-4 py-3 hover:bg-primary transition font-semibold cursor-pointer flex items-center justify-center gap-4"
        > {icon && <span>{icon}</span>} {/* ✅ Render the icon if provided */}
         <span>{label}</span>
        </div>
    );
}

export default MenuItem;