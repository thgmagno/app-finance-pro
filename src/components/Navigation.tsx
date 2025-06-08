'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/store/useUserStore'
import { LifeBuoy, LogOut, User, Users } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useEffect } from 'react'

export function Navigation() {
  const { userCtx, lastUpdateAt } = useUserStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tecla de Atalhos
      if (e.ctrlKey && e.key.toLowerCase() === '/') {
        e.preventDefault()
        alert('Atalho pressionado: Novo Lançamento!')
      }

      if (e.ctrlKey && e.key.toLowerCase() === 'r') {
        e.preventDefault()
        alert('Atalho pressionado: Revalidar Dados!')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <nav className="card mx-auto flex items-center justify-between border-b py-6 shadow md:my-6">
      <Menubar className="pl-3 md:pl-6">
        <MenubarMenu>
          <MenubarTrigger>Financeiro</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Novo Lançamento <MenubarShortcut>ctrl+/</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Nova Reserva</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <p className="flex flex-col">
                <span>Revalidar Dados</span>
                {lastUpdateAt && (
                  <span className="text-muted-foreground text-xs">
                    Atualizado{' '}
                    {formatDistanceToNow(new Date(lastUpdateAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                )}
              </p>
              <MenubarShortcut>ctrl+R</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Relatórios</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Evolução no Tempo</MenubarItem>
            <MenubarItem>Projeção de Caixa</MenubarItem>
            <MenubarItem>Atrasos</MenubarItem>

            <MenubarSeparator />
            <MenubarItem>Total por Categoria</MenubarItem>
            <MenubarItem>Ranking Transações</MenubarItem>

            <MenubarSeparator />
            <MenubarItem>Efetividade da Baixa</MenubarItem>
            <MenubarItem>Tempo Médio de Pagamento</MenubarItem>
            <MenubarItem>Reservas vs Real</MenubarItem>
            <MenubarItem>Reservas % do Saldo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <DropdownMenu>
        <DropdownMenuTrigger className="pr-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{userCtx?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User /> Perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users /> Grupo
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy /> Ajuda
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
