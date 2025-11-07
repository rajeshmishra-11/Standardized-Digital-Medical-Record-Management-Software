import RoleSelector from '../RoleSelector';
import { useState } from 'react';

export default function RoleSelectorExample() {
  const [role, setRole] = useState<"patient" | "doctor" | "pharmacy">("patient");

  return (
    <RoleSelector 
      value={role}
      onChange={(value) => {
        setRole(value);
        console.log('Role changed:', value);
      }}
    />
  );
}
