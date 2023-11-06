"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Loader } from "lucide-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Medium",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    paymentMethod: "Easy",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    paymentMethod: "Easy",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    paymentMethod: "Hard",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    paymentMethod: "Easy",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    paymentMethod: "Medium",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    paymentMethod: "Hard",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 align-middle">
      <h1 className="my-4 text-center text-4xl font-semibold		">
        Suas <span className="text-primary">Tasks</span>
      </h1>{" "}
      <Table>
        <TableCaption>Lista das suas metas diárias.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              {" "}
              <div className="flex items-center">
               
              </div>
            </TableHead>
            <TableHead>Meta</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Mini Tasks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">
                {" "}
                <Checkbox id="terms" className="mr-2 rounded align-middle" />
              </TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
