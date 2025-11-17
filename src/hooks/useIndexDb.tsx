
import { openDB } from "@/utils/utils";
import { useEffect, useState } from "react";

export function useIndexDb() {
    const [db, setDb] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        async function initIndexDb() {
            const dbName = "notes";
            const instance = await openDB(dbName, 1);
            setDb(instance);
            console.log("✅ DB instance initialized:", instance);
        }
        initIndexDb();
    }, []);


    useEffect(() => {
        if (db) getUser();
    }, [db]);


    function addUser(user: { name: string; age: number, userId: string }) {
        const payload = {
            name: "Rahul Roy",
            age: 22,
            userId: Date.now()
        }

        const tx = db.transaction("users", "readwrite");
        const store = tx.objectStore("users")
        store.add(payload);
        tx.oncomplete = () => console.log("✅ User added successfully!");
        tx.onerror = (e: any) => console.log("Bc error aa gya", e);
        getUser()
    }

    function getUser() {
        const tx = db.transaction("users", "readonly");
        const store = tx.objectStore("users");
        const users = store.getAll();

        users.onsuccess = (event: any) => {
            const users = event.target.result;
            setUsers(users);
        }
        users.onerror = (event: any) => {
            console.log("error aa gya", event);
        }
    }

    function deleteUser(id: string) {
        const tx = db.transaction("users", "readwrite");
        const store = tx.objectStore("users");
        store.delete(id);

        store.onsuccess = (event: any) => {
            console.log("User Deleted Succesfully!");
        }
        store.onerror = (err: any) => {
            console.log("Some eror aa gya. bc", err)
        }
        getUser();
    }


    return { db, setDb, users, addUser, getUser, deleteUser };
}
