"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    titulo: z.string().min(2, {
        message: "Necessário mais que dois caracteres.",
    }),
    // email: z.string().email({
    //     message: "Digite o email correto"
    // }),
    descricao: z.string()
})

export default function SaveLivro() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { //valor que aparece por padrão
            titulo: "Genilso",
            descricao: "genilsogmail.com",
        },
    })

    async function onSubmit(livro: z.infer<typeof FormSchema>) {
        const requestOptions= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(livro)
        }
        const response = await fetch("https://apiserver20241-nine.vercel.app/livros", requestOptions)
        form.reset();
        alert("Estudante Cadastrado!")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do livro:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome do livro" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descricao:</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite a descrição" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    )
}