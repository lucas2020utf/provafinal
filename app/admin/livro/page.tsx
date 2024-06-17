import { Button } from "@/components/ui/button";
import ListBoock from "./List";
import ListLivro from "./List";

export default function Livro() {
    return (
        <div className="w-full flex flex-col  mt-6">
            <div className="flex justify-center mb-6">
                <a href="/admin/course/new">
                    <Button>Cadastrar Livro</Button>
                </a>
            </div>
            <ListLivro />
        </div>
    )
}