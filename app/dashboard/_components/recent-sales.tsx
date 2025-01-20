import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { subscribersData } from '@/lib/placeholders';
const salesData = subscribersData.slice(0, 5)

export function RecentSales() {
  return (
    <div className="space-y-8">
      {salesData.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.img} alt="Avatar" />
            <AvatarFallback>
              {sale.name.charAt(0).toUpperCase() +
                sale.name.charAt(sale.name.indexOf(' ') + 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{"+50000 VND"}</div>
        </div>
      ))}
    </div>
  );
}