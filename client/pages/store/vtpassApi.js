// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const airBaseUrl = 'https://api-service.vtpass.com/api/pay';
const merchantBaseUrl = 'https://api-service.vtpass.com/api/merchant-verify';
const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

export const vtpassApi = createApi({
  reducerPath: 'vtpassApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:3000/api/v1' }),
  prepareHeaders(headers) {
    headers.set('api-key', ` ${API_KEY}`);
    headers.set('secret-key', `${SECRET_KEY}`);
    // You can also set other headers here if needed
    return headers;
  },
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => `/airtime`,
    }),
    getElectricity: builder.query({
      query: () => `/electricity`,
    }),
    getTvcable: builder.query({
      query: () => `/tvcable`,
    }),
    getEducation: builder.query({
      query: () => `/education`,
    }),
    getJambfee: builder.query({
      query: () => `/jambfee`,
    }),
    addAirTime: builder.mutation({
      query: (data) => ({
        url: '/airtime',
        method: 'POST',
        // baseQuery: fetchBaseQuery({ baseUrl: airBaseUrl }),
        body: data,
      }),
    }),
    addDues: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    addJambfee: builder.mutation({
      query: (data) => ({
        url: '/jambfee',
        method: 'POST',
        body: data,
      }),
    }),
    addTvCable: builder.mutation({
      query: (data) => ({
        url: '/tvcable',
        method: 'POST',
        baseQuery: fetchBaseQuery({ baseUrl: merchantBaseUrl }),
        body: data,
      }),
    }),
    addEducation: builder.mutation({
      query: (data) => ({
        url: '/education',
        method: 'POST',
        baseQuery: fetchBaseQuery({ baseUrl: merchantBaseUrl }),
        body: data,
      }),
    }),
    addElectricity: builder.mutation({
      query: (data) => ({
        url: '/electricity',
        method: 'POST',
        // baseQuery: fetchBaseQuery({ baseUrl: merchantBaseUrl }),
        body: data,
      }),
    }),

  })
})

export const
  { useGetDataQuery, useGetElectricityQuery,useAddElectricityMutation,
    useAddAirTimeMutation,useGetTvcableQuery,
    useGetEducationQuery,useGetJambfeeQuery,
    useAddDuesMutation, useAddJambfeeMutation,
    useAddTvCableMutation, useAddEducationMutation
  } = vtpassApi