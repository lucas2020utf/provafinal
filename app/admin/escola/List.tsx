import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { revalidatePath } from "next/cache"

  interface IEscola{
    id:number,
    name:string,
  }
  
  export default async function ListEscola() {
    const courses = await list()
    async function list(){
      revalidatePath("/admin/escola")
      const response = await fetch("https://serverkuki.vercel.app/escolas")
        return response.json();
    }

    async function deleteEscola(formData: FormData) {
      "use server"
      const id = formData.get("id") as string;
      const response = await fetch("https://serverkuki.vercel.app/escolas/"+id, {method: "DELETE"});
      revalidatePath("/admin/escola")
  
    }

    return (
      <Table>
        <TableCaption>Lista de Escola</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((item:IEscola) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteEscola}>EXCLUIR</Button>
              </form>
            </TableCell>
            </TableRow>

          ))}
        </TableBody>
       
      </Table>
    )
  }
  