import logoImage from "../assets/logo.svg"
import { Plus } from "phosphor-react"

import * as Dialog from "@radix-ui/react-dialog"

export function Header() {
    return (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
          <img src={logoImage} alt="logo" />

          <Dialog.Root>
            <Dialog.Trigger 
              type="button"
              className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
            >
              <Plus size={20} className="text-violet-500"/>
              Novo habito
            </Dialog.Trigger>
          </Dialog.Root>

        </div> // 50:00
    )
}