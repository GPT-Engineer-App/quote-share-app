import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### quotes

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| created_at | timestamptz | string | true     |
| quote      | text        | string | false    |
| description| text        | string | false    |
| author     | text        | string | false    |
| background | text        | string | false    |

*/

// Hooks for quotes table

export const useQuotes = () => useQuery({
    queryKey: ['quotes'],
    queryFn: () => fromSupabase(supabase.from('quotes').select('*')),
});

export const useQuote = (id) => useQuery({
    queryKey: ['quotes', id],
    queryFn: () => fromSupabase(supabase.from('quotes').select('*').eq('id', id).single()),
});

export const useAddQuote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newQuote) => fromSupabase(supabase.from('quotes').insert([newQuote])),
        onSuccess: () => {
            queryClient.invalidateQueries('quotes');
        },
    });
};

export const useUpdateQuote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedQuote) => fromSupabase(supabase.from('quotes').update(updatedQuote).eq('id', updatedQuote.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('quotes');
        },
    });
};

export const useDeleteQuote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('quotes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('quotes');
        },
    });
};