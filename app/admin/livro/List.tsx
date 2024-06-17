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

  interface ILivro{
    id:number,
    titulo:string,
    descricao:string
  }
  
  export default async function ListLivro() {
    const livros = await list()
    async function list(){
      revalidatePath("/admin/livro")
      const response = await fetch("https://apiserver20241-nine.vercel.app/livros")
        return response.json();
    }

    async function deleteLivro(formData: FormData) {
      "use server"
      const id = formData.get("id") as string;
      const response = await fetch("https://apiserver20241-nine.vercel.app/livros/"+id, {method: "DELETE"});
      revalidatePath("/admin/livro")
  
    }

    return (
      <Table>
        <TableCaption>Lista de Livro</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {livros.map((item:ILivro) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.titulo}</TableCell>
              <TableCell className="font-medium">{item.descricao}</TableCell>
              <TableCell>{item.descricao}</TableCell>
              <TableCell>
              <form>
                <input type="text" hidden name="id" value={item.id} />
                <Button variant="destructive" formAction={deleteLivro}>EXCLUIR</Button>
              </form>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  