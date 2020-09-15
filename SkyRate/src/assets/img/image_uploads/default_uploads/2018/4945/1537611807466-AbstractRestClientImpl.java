package com.pge.cfs.rest.client.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.pge.cfs.corelib.config.ConfigManager;
import com.pge.cfs.rest.client.AbstractRestClient;

/**
 * 
 *
 */
public class AbstractRestClientImpl implements AbstractRestClient {

	/**
	 * 	
	 */
	private static final Logger LOGGER = Logger.getLogger(AbstractRestClientImpl.class);

	/**
	 * 
	 */
	@Autowired
	protected RestTemplate cpanRestTemplate;

	private static final String WS_CPAN_HIGHBILL_MODULE = "cocEiServices";
	private static final String WS_REST_CONNECTION_TIMEOUT = "restservice.connection.timeout";
	private static final String WS_REST_READ_TIMEOUT="restservice.read.timeout";
	/**
	 * 
	 */
	@PostConstruct
	public void init() throws Exception {
		List<HttpMessageConverter<?>> messageConverterList = cpanRestTemplate.getMessageConverters();
		MappingJackson2HttpMessageConverter jsonMessageConverter = new MappingJackson2HttpMessageConverter();
		List<MediaType> supportedMediaTypes = new ArrayList<MediaType>();
		supportedMediaTypes.add(new MediaType("application", "json", MappingJackson2HttpMessageConverter.DEFAULT_CHARSET));
		jsonMessageConverter.setSupportedMediaTypes(supportedMediaTypes);
		messageConverterList.add(jsonMessageConverter);
		cpanRestTemplate.setMessageConverters(messageConverterList);
		setRestServiceTimeout(cpanRestTemplate.getRequestFactory()); 
	}
	
	private void setRestServiceTimeout(ClientHttpRequestFactory basicFactory) throws Exception{
		
		if ( basicFactory == null  )  {
			LOGGER.info("Factory is empty");
			return;
		}	
		
		LOGGER.info("Enters :: clientHttpRequestFactory");
		SimpleClientHttpRequestFactory factory = (SimpleClientHttpRequestFactory) basicFactory ; 
        int readTimeout=-1,connectionTimeout=-1;
        readTimeout = Integer.parseInt(ConfigManager.getString(WS_CPAN_HIGHBILL_MODULE, WS_REST_READ_TIMEOUT)) ; 
        connectionTimeout = Integer.parseInt(ConfigManager.getString(WS_CPAN_HIGHBILL_MODULE, WS_REST_CONNECTION_TIMEOUT)) ; 
        LOGGER.info(String.format("CPAN rest service connection timeout %s, readTimeout:%s " ,connectionTimeout  , readTimeout));
        factory.setReadTimeout(readTimeout);
        factory.setConnectTimeout(connectionTimeout);
        LOGGER.info("Ends  :: clientHttpRequestFactory");
    }

	/* (non-Javadoc)
	 * @see com.pge.cpan.rest.client.AbstractRestClient#getUri(java.util.Map, java.lang.String)
	 */
	@Override
	public UriComponents getUri(Map<String, String> queryParams, String uri) {
		UriComponentsBuilder builder=UriComponentsBuilder.fromUriString(uri);
		if(queryParams != null && queryParams.size() >0){
			for (Map.Entry<String, String> entry : queryParams.entrySet()) {
				builder.queryParam(entry.getKey(),entry.getValue());
			}
		}
		return builder.build();
	}

	/* (non-Javadoc)
	 * @see com.pge.cpan.rest.client.AbstractRestClient#restClientRequestForQueryParam(org.springframework.web.util.UriComponents, org.springframework.http.HttpMethod, java.lang.Class)
	 */
	@Override
	public <T> ResponseEntity<?> restClientRequestForQueryParam(UriComponents uriComponents, HttpMethod method, Class<T> classType, Map<String, String> headers) throws Exception {
		LOGGER.info("Enters :: restClientRequestForQueryParam");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setAccept(Arrays.asList(new MediaType[] {MediaType.APPLICATION_JSON}));
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		if(headers != null && !headers.isEmpty()) {
			for (String key : headers.keySet()) {
				requestHeaders.set(key.toString(), headers.get(key));
			}
		}
		MultiValueMap<String, String> params = uriComponents.getQueryParams();
		HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(params, requestHeaders);		
		LOGGER.info("restTemplate-"+cpanRestTemplate+"\n"+"uri-"+uriComponents.getPath()+ "\nurl-"+uriComponents.toUriString()+"\n"+"HttpMethod -"+method+"\n"+"httpEntity-"+httpEntity);
		ResponseEntity<?> responseEntity = cpanRestTemplate.exchange(uriComponents.toUriString(), method, httpEntity, classType);
		LOGGER.info("responseEntity="+responseEntity);
		return responseEntity;
	}

	@Override
	public <T> ResponseEntity<?> restClientRequestForUri(UriComponents uriComponents, HttpMethod method,  ParameterizedTypeReference<T> responseType , Map<String, String> headers) throws Exception {
		LOGGER.info("Enters :: restClientRequestForQueryParam");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setAccept(Arrays.asList(new MediaType[] {MediaType.APPLICATION_JSON}));
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		if(headers != null && !headers.isEmpty()) {
			for (String key : headers.keySet()) {
				requestHeaders.set(key.toString(), headers.get(key));
			}
		}
		MultiValueMap<String, String> params = uriComponents.getQueryParams();
		HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(params, requestHeaders);		
		LOGGER.info("restTemplate-"+cpanRestTemplate+"\n"+"uri-"+uriComponents.getPath()+ "\nurl-" +uriComponents.toUriString()+"\n"+"HttpMethod -"+method+"\n"+"httpEntity-"+httpEntity);
		ResponseEntity<?> responseEntity = cpanRestTemplate.exchange(uriComponents.toUriString(), method, httpEntity, responseType);
		LOGGER.info("responseEntity="+responseEntity);
		return responseEntity;
	}

	
	/* (non-Javadoc)
	 * @see com.pge.cpan.rest.client.AbstractRestClient#restClientRequestForObject(java.lang.Object, java.lang.String, org.springframework.http.HttpMethod, java.lang.Class)
	 */
	@Override
	public <T> ResponseEntity<?> restClientRequestForObject(Object instance, String uri, HttpMethod method, Class<T> classType, Map<String, String> headers) throws Exception {
		LOGGER.info("Enters :: restClientRequestForObject");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setAccept(Arrays.asList(new MediaType[] {MediaType.APPLICATION_JSON}));
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		if(headers != null && !headers.isEmpty()) {
			for (String key : headers.keySet()) {
				requestHeaders.set(key.toString(), headers.get(key));
			}
		}
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(instance, requestHeaders);
		LOGGER.info("restTemplate-"+cpanRestTemplate+"HttpMethod -"+method+"httpEntity-"+httpEntity);
		ResponseEntity<?> responseEntity = cpanRestTemplate.exchange(uri, method, httpEntity, classType);
		LOGGER.info("responseEntity="+responseEntity);
		return responseEntity;
	}

	/* (non-Javadoc)
	 * @see com.pge.cpan.rest.client.AbstractRestClient#getStringArrayFromResponse(java.lang.String)
	 */
	@Override
	public String[] getStringArrayFromResponse(String body) {
		body = body.replaceAll("\"", "");
		return body.substring(body.indexOf("[")+1,body.indexOf("]")).split(",");
	}
}
