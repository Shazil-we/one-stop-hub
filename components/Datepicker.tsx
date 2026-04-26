"use client"
import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Add props interface
interface DatePickerInputProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}

function isValidDate(date: Date | undefined) {
  if (!date) return false
  return !isNaN(date.getTime())
}

// Pass props into the component
export function DatePickerInput({ selectedDate, onDateChange }: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date | undefined>(selectedDate)
  // Derive the string value directly from the prop
  const value = formatDate(selectedDate)

  return (
    <Field className="w-48">
      <FieldLabel htmlFor="date-required">Event Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder="April 04, 2026"
          onChange={(e) => {
            const newDate = new Date(e.target.value)
            if (isValidDate(newDate)) {
              onDateChange(newDate) // Send it up to the parent
              setMonth(newDate)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-start">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton id="date-picker" variant="ghost" size="icon-xs">
                <CalendarIcon />
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate} // Use prop
                month={month}
                onMonthChange={setMonth}
                onSelect={(newDate) => {
                  onDateChange(newDate) // Send it up to the parent
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}