"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, ImageIcon, Film, Trash2, Edit, X } from "lucide-react";
import { supabase } from "@/components/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  onCreatePortfolio,
  onGetPortfolio,
  onDeletePortfolio,
  PortfolioItem,
} from "@/actions/portfolio";
import { Portfolio, PortfolioType } from "@prisma/client";
import Image from "next/image";

// Update the PortfolioItem interface first

export default function AdminPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [uploadData, setUploadData] = useState({
    title: "",
    category: "haircuts",
    type: "image",
    description: "",
  });
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demo purposes
    if (loginData.username === "admin" && loginData.password === "password") {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleUploadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Then modify the handleUpload function
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !youtubeUrl) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      if (!youtubeUrl && file) {
        // Generate unique filename
        const fileExt = file?.name.split(".").pop();
        const uniqueId = Date.now().toString();
        const fileName = `${uniqueId}.${fileExt}`;
        const filePath = `${uploadData.category}/${fileName}`;

        // Upload file to Supabase Storage
        const { error: uploadError, data } = await supabase.storage
          .from("img")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("img").getPublicUrl(filePath);

        if (!publicUrl) {
          return toast({
            title: "Upload failed",
            description: `Failed to upload the ${uploadData.type}`,
            variant: "destructive",
          });
        }
        // Create database entry with type field
        const response = await onCreatePortfolio({
          title: uploadData.title,
          url: publicUrl,
          category: uploadData.category,
          type: uploadData.type as PortfolioType,
          description: uploadData.description,
        });
        if (response.status !== 201) {
          return toast({
            title: "Upload failed",
            description:
              response.message ||
              "There was an error creating the portfolio item",
            variant: "destructive",
          });
        }

        toast({
          title: "Upload successful",
          description: `${
            uploadData.type === "video" ? "Video" : "Image"
          } has been added to your portfolio`,
        });

        // Reset form
        setUploadData({
          title: "",
          category: "haircuts",
          type: "image",
          description: "",
        });
        setFile(null);
        setYoutubeUrl("");
      }

      if (youtubeUrl) {
        // Create database entry with type field
        const response = await onCreatePortfolio({
          title: uploadData.title,
          url: youtubeUrl,
          category: uploadData.category,
          type: uploadData.type as PortfolioType,
          description: uploadData.description,
        });
        if (response.status !== 201) {
          return toast({
            title: "Upload failed",
            description:
              response.message ||
              "There was an error creating the portfolio item",
            variant: "destructive",
          });
        }

        toast({
          title: "Upload successful",
          description: `${
            uploadData.type === "video" ? "Video" : "Image"
          } has been added to your portfolio`,
        });

        // Reset form
        setUploadData({
          title: "",
          category: "haircuts",
          type: "image",
          description: "",
        });
        setFile(null);
        setYoutubeUrl("");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    async function fetchPortfolioItems() {
      try {
        const response = await onGetPortfolio();
        console.log("Portfolio items fetched:", response.data);

        if (response.status !== 200) throw response.message;
        setPortfolioItems(response.data || []);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        toast({
          title: "Error loading portfolio",
          description: "Failed to load portfolio items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchPortfolioItems();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    try {
      const res = await onDeletePortfolio(id);
      if (res.status === 200) {
        setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
        toast({
          title: "Item deleted",
          description: "Portfolio item has been removed",
        });
      } else {
        toast({
          title: "Delete failed",
          description: res.message || "There was an error deleting the item",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the item",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acceso Administrador</CardTitle>
            <CardDescription>
              Inicia sesión para gestionar tu contenido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-900"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-gray-500 text-center">
            For demo: username = "admin", password = "password"
          </CardFooter>
        </Card>
      </div>
    );
  }

  console.log("youtubeUrl:", youtubeUrl);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upload">Subir Contenido</TabsTrigger>
            <TabsTrigger
              value="manage"
              onClick={() => setIsAuthenticated(isAuthenticated)}
            >
              Gestionar Contenido
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subir al Portafolio</CardTitle>
                <CardDescription>
                  Añade nuevas imágenes o vídeos a tu galería
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      value={uploadData.title}
                      onChange={handleUploadChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select
                        value={uploadData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Formaciones y Seminarios">
                            Formaciones y Seminarios
                          </SelectItem>
                          <SelectItem value="Directos">Directos</SelectItem>
                          <SelectItem value="Material educativo">
                            {" "}
                            Material educativo
                          </SelectItem>
                          <SelectItem value="Eventos"> Eventos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Contenido</Label>
                      <Select
                        value={uploadData.type}
                        onValueChange={(value) =>
                          handleSelectChange("type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Imagen</SelectItem>
                          <SelectItem value="video">Vídeo</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={uploadData.description}
                      onChange={handleUploadChange}
                      rows={3}
                    />
                  </div>

                  {uploadData.type === "youtube" ? (
                    <div className="space-y-2">
                      <Label htmlFor="youtubeUrl">YouTube URL</Label>
                      <Input
                        id="youtubeUrl"
                        name="youtubeUrl"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=example"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="file">Subir Archivo</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Input
                          id="file"
                          type="file"
                          accept={
                            uploadData.type === "image" ? "image/*" : "video/*"
                          }
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Label
                          htmlFor="file"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          {uploadData.type === "image" ? (
                            <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                          ) : (
                            <Film className="h-12 w-12 text-gray-400 mb-2" />
                          )}
                          <span className="text-sm text-gray-500">
                            {file
                              ? file.name
                              : "Haz clic para seleccionar un archivo"}
                          </span>
                        </Label>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-teal-800 hover:bg-teal-900"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="flex items-center">
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    ) : (
                      "Upload to Cloudinary"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestionar Portafolio</CardTitle>
                <CardDescription>
                  Ver, editar o eliminar tu contenido
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading portfolio items...</p>
                  </div>
                ) : portfolioItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No items in your portfolio yet
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map((item) => {
                      const extractVideoId = (url: string): string | null => {
                        const regex =
                          /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
                        const match = url.match(regex);
                        return match ? match[1] : null;
                      };

                      const videoId = extractVideoId(item.url);

                      return (
                        <div
                          key={item.id}
                          className="relative group rounded-lg overflow-hidden border border-gray-200"
                        >
                          <div className="aspect-[3/4] relative">
                            {item.type === "youtube" ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}${
                                  false ? "?autoplay=1" : ""
                                }`}
                                title={item.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                className="absolute inset-0 w-full h-full object-cover"
                                allowFullScreen
                              />
                            ) : item.type === "video" ? (
                              <video
                                src={item.url}
                                className="absolute inset-0 w-full h-full object-cover"
                                controls
                                preload="metadata"
                              />
                            ) : (
                              <Image
                                src={item.url}
                                alt={`${item.category} ${item.type}`}
                                fill
                                className="object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      ¿Estás seguro?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción no se puede deshacer. Se
                                      eliminará permanentemente este elemento de
                                      tu portafolio.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(item.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          <div className="p-3 bg-white">
                            <p className="text-sm font-medium capitalize">
                              {item.category}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {item.type}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
