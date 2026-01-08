import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAPI } from "../api";
import Button from "./ui/Button";
import VideoWithPlay from "./VideoWithPlay"; // your component


/* ---------- 1.  STATIC  (trimmed URLs) ---------- */
const staticProjects = [
  {
    img: [
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-14.JPG",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-17.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-18.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-19.jpg",
    ],
    description: ["Flat roof bungalow", "Modern kitchen", "Guest house"],
  },
  {
    img: [
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-6.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-7.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-8.jpg",
    ],
    description: ["Spacious modern bungalow", "Modern kitchen"],
  },
 
];

/* ---------- 2.  BLOB FOLDERS  (fresh URLs – no trailing spaces) ---------- */
const blobProjects = Object.fromEntries(
  [
    {
      folder: "cci_ruai",
      urls: [
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.48.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.48ewrwerw.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.49adsderefdsse.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.49ewrwerew.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.49ewrwerewererew.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.50dsafsdewfa.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.50fddfasea.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.51dsfdeseae.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.13.51fsdfwefs.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Image%202026-01-02%20at%2011.17.02fdfdseaefeds.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Video%202026-01-02%20at%2010.54.54.mp4",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/WhatsApp%20Video%202026-01-02%20at%2010.54.55yuy.mp4",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/erwerwe.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/iuoui.jpeg",
        "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cci_ruai/uioiuupiu.jpeg",
      ],
    },
    { folder: "cedar1",      urls: [
      
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.54.jpeg",

"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.56.jpeg",

"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.56gdfg.jpeg",
    ] },
    { folder: "cedar2",      urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/WhatsApp%20Video%202026-01-02%20at%2010.59.44.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/huju.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/jjkuy.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/ryrtyrtyr.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/trytryr.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/yuiiy.jpeg",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/yuyiy.jpeg",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/cedar2/yuyuyut.mp4"
    ] },
    { folder: "full_gospel", urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/2222.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.03.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.0356.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.04111.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.04432.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.04567.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.0456789.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.05444.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2010.52.055555.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.54.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.56.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.56gdfg.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.57gdgdfg.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Image%202026-01-02%20at%2011.22.58dfgfdfg.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/full_gospel/WhatsApp%20Video%202026-01-02%20at%2010.52.03.mp4",
    ] },
    { folder: "highway",     urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/highway/WhatsApp%20Image%202026-01-02%20at%2011.21.55.jpeg",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/highway/WhatsApp%20Video%202026-01-02%20at%2011.00.40.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/highway/fgrsdfr.mp4",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/highway/fgtges.mp4"
    ] },
    { folder: "hurlingum",   urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/hurlingum/WhatsApp%20Image%202026-01-02%20at%2011.29.26.jpeg",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/hurlingum/WhatsApp%20Image%202026-01-02%20at%2011.29.26df.jpeg",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/hurlingum/WhatsApp%20Image%202026-01-02%20at%2011.29.27dsfsd.jpeg",
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/hurlingum/WhatsApp%20Image%202026-01-02%20at%2011.29.27dsfsdfs.jpeg"
    ] },
    { folder: "infinity",    urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/WhatsApp%20Image%202026-01-02%20at%2010.54.01.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/WhatsApp%20Image%202026-01-02%20at%2010.54.0178.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/WhatsApp%20Image%202026-01-02%20at%2011.08.56.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/WhatsApp%20Image%202026-01-02%20at%2011.08.56df.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/dfefs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/guyurtfrdre.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/hjuio.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/iioip.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/iuyjgy.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/jhhj.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/oipio.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/poiu.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/infinity/uiiouii.mp4",
    ] },
    { folder: "kibwezi",     urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/kibwezi/WhatsApp%20Image%202026-01-02%20at%2011.10.36.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/kibwezi/WhatsApp%20Image%202026-01-02%20at%2011.10.37ewrwrwe.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/kibwezi/ewrwer.jpeg",
    ] },
    { folder: "loitoktok",   urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.18.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.18erewrew.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.18erwerwe.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.18frse.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.19erwerwrew.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.19ewrwerw.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/loitoktok/WhatsApp%20Image%202026-01-02%20at%2011.13.19ewrwerwer.jpeg",
    ] },
    { folder: "makueni",     urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.21.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.26.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.26dfgre.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.26dsdfsder.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.26fsfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.26sdfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29dfsfser.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29dsffse.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29dsfsdfdss.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29dsfsdfsdf.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29sdfdsfsdfsdf.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29sdfsdfe.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29sfsdfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.29sfsfdsfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/makueni/WhatsApp%20Image%202026-01-02%20at%2011.37.30sdfsfsefs.jpeg",
    ] },
    { folder: "mutalia",     urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.01.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.01.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.02fgdff.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.02fsddfsd.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.03dfsdfsd.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.03dsfsdfdf.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.03fdsfds.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.03sfds.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.04dsfdsfsd.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Image%202026-01-02%20at%2011.26.04sfdsfdf.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/mutalia/WhatsApp%20Video%202026-01-02%20at%2011.25.17.mp4",
    ] },
    { folder: "proj1",       urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/4.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/7889.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.38.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.385.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.386.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.3945.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.3978.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.3990.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/proj1/WhatsApp%20Image%202026-01-02%20at%2010.48.39909.jpeg",
    ] },
    { folder: "sosioni",     urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/sosioni/WhatsApp%20Image%202026-01-02%20at%2011.03.55.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/sosioni/WhatsApp%20Image%202026-01-02%20at%2011.03.56.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/sosioni/WhatsApp%20Image%202026-01-02%20at%2011.12.26.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/sosioni/gtgt.mp4",
    ] },
    { folder: "taala",       urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/WhatsApp%20Image%202026-01-02%20at%2011.07.36.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/WhatsApp%20Image%202026-01-02%20at%2011.11.45.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/WhatsApp%20Image%202026-01-02%20at%2011.11.45weaeaeaw.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/WhatsApp%20Image%202026-01-02%20at%2011.11.45weaweawe.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/dfrge.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/erewrew.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/gfgf.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/ghtyr.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/taala/gthe.jpeg",
    ] },
    { folder: "umoja_bcenter", urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.02.41.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.02.42.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.08.12.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.04.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.05.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.06.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.07dfsdfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.07fdfsds.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.07fsfdsd.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.08dfsds.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.08dfsfsdfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.10.08fsdfs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.11.15.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.11.15ewrweeew.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/umoja_bcenter/WhatsApp%20Image%202026-01-02%20at%2011.11.15rwerwe.jpeg",
    ] },
    { folder: "utawala",     urls: [
      "https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.02.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.02dfdse.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.03ddwedf.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.03dsfewfd.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.44dsadsaa.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.49dsfese.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.53dfseef.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.53sdfssefs.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.17.54dsfefsssd.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/WhatsApp%20Image%202026-01-02%20at%2011.19.01.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/ddsadq.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/dfdfdsfse.jpeg",
"https://a4jgz2t5d07jl2cf.public.blob.vercel-storage.com/utawala/fgfgd.jpeg",
    ] },
  ].map(({ folder, urls }) => [
    folder,
    { img: urls.slice(0, 10), description: [`Project folder: ${folder}`] },
  ])
);

const safe = (arr) => (Array.isArray(arr) ? arr : []);

export default function Projects() {
  const [projects, setProjects] = useState(staticProjects);
  const [currentIndexes, setCurrentIndexes] = useState(staticProjects.map(() => 0));
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  /* 1. fetch dynamic projects + blob folders -------------------*/
  useEffect(() => {
    fetchAPI("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const db = safe(data).map((p) => ({
          img:  safe(p.images).some((i) => typeof i === "string" && i.trim() !== "")
                 ? []                                    // block DB images
                 : safe(p.images),
          description: safe(p.description),
        }));
        const blob = Object.values(blobProjects).filter((p) => p.img.length);
        const merged = [...staticProjects, ...db, ...blob];
        setProjects(merged);
        setCurrentIndexes(merged.map(() => 0));
      })
      .catch((err) => console.error("❌ Fetch projects failed:", err));
  }, []);

  /* 2. 30-second GLOBAL rotation with 5 s CSS fade ------------*/
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((idx, i) => {
          const imgs = safe(projects[i]?.img);
          return imgs.length ? (idx + 1) % imgs.length : 0;
        })
      );
    }, 30000);
    return () => clearInterval(id);
  }, [projects]);

  /* 3. light-box controls --------------------------------------*/
  const openLightbox = (images, index) => setLightbox({ isOpen: true, images, index });
  const closeLightbox = () => setLightbox((p) => ({ ...p, isOpen: false }));
  const prevImage = () =>
    setLightbox((p) => ({ ...p, index: (p.index - 1 + p.images.length) % p.images.length }));
  const nextImage = () =>
    setLightbox((p) => ({ ...p, index: (p.index + 1) % p.images.length }));

  /* ---------- render ------------------------------------------*/
  return (
    <section id="projects" className="projects">
      <div className="projects-catalogue">
        <h2 className="projects-heading">Projects Gallery</h2>
        <p className="projects-text">Take a sneak peek at a few of our masterpieces</p>
      </div>

      <div className="gallery">
        {safe(projects).map((proj, idx) => (
          <Card key={idx} className="projects-card-gallery">
            <CardContent
              className="project-card-content fade-wrapper"
              onClick={() => openLightbox(proj.img, currentIndexes[idx])}
            >
              {proj.img.length > 0 && (
                <VideoWithPlay
                  src={proj.img[currentIndexes[idx]].trim()}
                  poster={proj.img.find((u) => !/\.(mp4|webm|ogg|m3u8|mov)(\?.*)?$/i.test(u))?.trim()}
                  className="fade-image"
                  onClick={() => openLightbox(proj.img, currentIndexes[idx])}
                />
              )}

              <ul className="project-description">
                {safe(proj.description).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ---------- light-box (black shadow backdrop) ---------- */}
      {lightbox.isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}><X /></button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}><ChevronLeft /></button>
          {/*  VIDEO SUPPORT INSIDE LIGHT-BOX  */}
          {lightbox.images[lightbox.index] &&
            /\.(mp4|webm|ogg|m3u8|mov)(\?.*)?$/i.test(lightbox.images[lightbox.index]) ? (
            <video
              src={lightbox.images[lightbox.index]}
              controls
              muted
              loop
              playsInline
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightbox.images[lightbox.index]}
              alt="Preview"
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}><ChevronRight /></button>
        </div>
      )}

      {/* <Button className="projects-btn">
        <a href="/GalleryPage">View More</a>
      </Button> */}
    </section>
  );
}