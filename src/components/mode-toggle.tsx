import { Button } from '@/components/ui/button/button'
import { useTheme } from '@/lib/providers/theme-provider'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div>
      <Button className="mr-2" onClick={() => setTheme('light')}>
        <Sun className="h-4 w-4" />
      </Button>
      <Button className="mr-2" onClick={() => setTheme('dark')}>
        <Moon className=" h-4 w-4" />
      </Button>
    </div>
  )
}
