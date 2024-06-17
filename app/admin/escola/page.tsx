import { Button } from "@/components/ui/button";
import List from "./List";
import ListEscola from "./List";

export default function Escola() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/escola/new">
                    <Button>Cadastrar Escola</Button>
                </a>
            </div>
            <ListEscola />
        </div>
    )
}