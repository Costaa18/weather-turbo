"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    city: z.string().min(3, {
        message: "City must have at least 3 characters.",
    }),
});

export function WeatherForm() {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const getSimplifiedLanguage = (lang: string) => {
        // Pega apenas o código do idioma, ignorando a variação da região.
        const [language] = lang.split('-');
        return language;
    };

    const userLanguage = typeof navigator !== 'undefined' ? getSimplifiedLanguage(navigator.language || 'en') : 'en';

    // 1. Configure o formulário com validação.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            city: "",
        },
    });

    // 2. Função para buscar sugestões de cidades.
    const fetchCitySuggestions = debounce(async (query: string) => {
        if (query.length < 3) return;
        setLoading(true);
        console.log(userLanguage);

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct`, // OpenWeatherMap Geocoding
                {
                    params: {
                        q: query,
                        limit: 5, // Limitar a 5 resultados
                        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
                    },
                }
            );

            // Extraindo os nomes das cidades do retorno.
            const cities = response.data.map(
                (item: { local_names: { [key: string]: string }; name: string; country: string }) => {
                    // Verifique se userLanguage é válido e se existe em local_names
                    const cityName = item.local_names?.[userLanguage as string] || item.local_names?.['en'] || item.name;
                    return `${cityName}, ${item.country}`;
                }
            );

            setSuggestions(cities);
        } catch (error) {
            console.error("Erro ao buscar sugestões de cidades:", error);
        } finally {
            setLoading(false);
        }
    }, 300); // Debounce de 300ms para evitar múltiplas chamadas

    // 3. Handler para quando o campo de cidade muda.
    const handleCityChange = (value: string) => {
        form.setValue("city", value);
        fetchCitySuggestions(value);
    };

    // 4. Submit do formulário.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Cidade selecionada:", values.city);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input className="min-h-[2.5rem]"
                                        placeholder="Ex. Porto, Portugal"
                                        {...field}
                                        onChange={(e) => handleCityChange(e.target.value)}
                                    />
                                    {/* Lista de sugestões */}
                                    {suggestions.length > 0 && (
                                        <ul
                                            className="absolute z-10 w-full bg-card border border-border rounded-md shadow-md mt-1 max-h-40 overflow-auto"
                                        >
                                            {loading && (
                                                <li className="p-[0.5rem] text-md text-muted-foreground">
                                                    Loading...
                                                </li>
                                            )}
                                            {!loading &&
                                                suggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            form.setValue("city", suggestion);
                                                            setSuggestions([]);
                                                        }}
                                                        className="p-[0.5rem] text-md cursor-pointer hover:bg-muted hover:text-muted-foreground rounded-md"
                                                    >
                                                        {suggestion}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}

                                </div>
                            </FormControl>
                            <FormDescription>
                                Please enter the name of the city for which you would like to
                                check the weather.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default WeatherForm;
