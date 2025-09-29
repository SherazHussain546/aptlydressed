
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically handle form submission, e.g., send data to an API endpoint.
        // For this example, we'll just simulate a successful submission.
        setSubmitted(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                {submitted ? (
                    <Alert className="border-green-500 text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle className="text-green-700">Thank You!</AlertTitle>
                        <AlertDescription>
                        Your message has been sent successfully. We'll get back to you shortly.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name">Name</label>
                            <Input id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject">Subject</label>
                            <Input id="subject" name="subject" placeholder="How can we help?" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message">Message</label>
                            <Textarea id="message" name="message" placeholder="Your message..." required rows={5} />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
