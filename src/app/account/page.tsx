import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const mockOrders = [
    { id: 'AD-84392', date: 'June 15, 2024', status: 'Delivered', total: '$265.00' },
    { id: 'AD-81997', date: 'May 02, 2024', status: 'Delivered', total: '$95.00' },
    { id: 'AD-79241', date: 'February 20, 2024', status: 'Delivered', total: '$180.00' },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-4xl font-headline mb-8">My Account</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-max">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell><Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="bg-green-100 text-green-800">{order.status}</Badge></TableCell>
                                <TableCell className="text-right">{order.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
               <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Jane" />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                    </div>
               </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                </div>
                 <div>
                    <Label htmlFor="password">Password</Label>
                    <Button variant="secondary" className="w-full">Change Password</Button>
                </div>
                <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Addresses</CardTitle>
                    <CardDescription>Manage your shipping addresses.</CardDescription>
                </div>
                <Button>Add New Address</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Default Shipping</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        <p>Jane Doe</p>
                        <p>123 Main St</p>
                        <p>Anytown, CA 12345</p>
                        <p>United States</p>
                        <div className="mt-4 flex gap-2">
                            <Button variant="secondary" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
